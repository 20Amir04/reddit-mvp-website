using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Reddit_MVP_backend.Data;
using Reddit_MVP_backend.DTOs;
using Reddit_MVP_backend.Models;

namespace Reddit_MVP_backend.Controllers
{
    [ApiController]
    [Route("api")]
    public class CommentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CommentsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("posts/{postId:int}/comments")]
        public async Task<IActionResult> GetPostComments(int postId)
        {
            var postExists = await _context.Posts.AnyAsync(post => post.Id == postId);

            if (!postExists)
            {
                return NotFound(new { message = "Post not found" });
            }

            var comments = await _context.Comments
                .Include(comment => comment.Author)
                .Where(comment => comment.PostId == postId)
                .OrderBy(comment => comment.CreatedAt)
                .Select(comment => new
                {
                    comment.Id,
                    comment.Content,
                    comment.CreatedAt,
                    comment.UpdatedAt,
                    comment.PostId,
                    comment.ParentCommentId,
                    authorId = comment.AuthorId,
                    authorUsername = comment.Author.UserName
                })
                .ToListAsync();

            var result = comments
                .Where(comment => comment.ParentCommentId == null)
                .Select(comment => new
                {
                    comment.Id,
                    comment.Content,
                    comment.CreatedAt,
                    comment.UpdatedAt,
                    comment.PostId,
                    comment.ParentCommentId,
                    comment.authorId,
                    comment.authorUsername,
                    replies = comments
                        .Where(reply => reply.ParentCommentId == comment.Id)
                        .Select(reply => new
                        {
                            reply.Id,
                            reply.Content,
                            reply.CreatedAt,
                            reply.UpdatedAt,
                            reply.PostId,
                            reply.ParentCommentId,
                            reply.authorId,
                            reply.authorUsername
                        })
                        .ToList()
                })
                .ToList();

            return Ok(result);
        }

        [Authorize]
        [HttpPost("posts/{postId:int}/comments")]
        public async Task<IActionResult> CreateComment(int postId, [FromBody] CreateCommentDto createCommentDto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrWhiteSpace(userId))
            {
                return Unauthorized(new { message = "Invalid token" });
            }

            if (string.IsNullOrWhiteSpace(createCommentDto.Content))
            {
                return BadRequest(new { message = "Comment content is required" });
            }

            var trimmedContent = createCommentDto.Content.Trim();

            if (trimmedContent.Length > 3000)
            {
                return BadRequest(new { message = "Comment content cannot exceed 3000 characters" });
            }

            var postExists = await _context.Posts.AnyAsync(post => post.Id == postId);

            if (!postExists)
            {
                return NotFound(new { message = "Post not found!" });
            }

            if (createCommentDto.ParentCommentId.HasValue)
            {
                var parentComment = await _context.Comments.FirstOrDefaultAsync(comment => comment.Id == createCommentDto.ParentCommentId.Value);

                if (parentComment == null)
                {
                    return NotFound(new { message = "Parent comment not found" });
                }

                if (parentComment.PostId != postId)
                {
                    return BadRequest(new { message = "Parent comment does not belong to this post" });
                }

                if (parentComment.ParentCommentId != null)
                {
                    return BadRequest(new { message = "Replies to replies are not supported" });
                }
            }

            var comment = new Comment
            {
                Content = trimmedContent,
                PostId = postId,
                AuthorId = userId,
                ParentCommentId = createCommentDto.ParentCommentId,
                CreatedAt = DateTime.UtcNow
            };

            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            var createdCommentId = comment.Id;

            var createdComment = await _context.Comments
                .Include(comment => comment.Author)
                .Where(comment => comment.Id == createdCommentId)
                .Select(comment => new
                {
                    comment.Id,
                    comment.Content,
                    comment.CreatedAt,
                    comment.UpdatedAt,
                    comment.PostId,
                    comment.ParentCommentId,
                    authorId = comment.AuthorId,
                    authorUsername = comment.Author.UserName,
                    replies = new List<object>()
                })
                .FirstOrDefaultAsync();

            return Ok(new
            {
                message = "Comment created successfully",
                comment = createdComment
            });
        }

        [Authorize]
        [HttpPut("comments/{id:int}")]
        public async Task<IActionResult> UpdateComment(int id, [FromBody] UpdateCommentDto updateCommentDto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrWhiteSpace(userId))
            {
                return Unauthorized(new { message = "Invalid token" });
            }

            if (string.IsNullOrWhiteSpace(updateCommentDto.Content))
            {
                return BadRequest(new { message = "Comment content is required" });
            }

            var trimmedContent = updateCommentDto.Content.Trim();

            if (trimmedContent.Length > 3000)
            {
                return BadRequest(new { message = "Comment content cannot exceed 3000 characters" });
            }

            var comment = await _context.Comments.FirstOrDefaultAsync(comment => comment.Id == id);

            if (comment == null)
            {
                return NotFound(new { message = "Comment not found" });
            }

            if (comment.AuthorId != userId)
            {
                return Forbid();
            }

            comment.Content = trimmedContent;
            comment.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Comment updated successfully" });
        }

        [Authorize]
        [HttpDelete("comments/{id:int}")]
        public async Task<IActionResult> DeleteComment(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrWhiteSpace(userId))
            {
                return Unauthorized(new { message = "Invalid token" });
            }

            var comment = await _context.Comments
                .Include(comment => comment.Replies)
                .FirstOrDefaultAsync(comment => comment.Id == id);

            if (comment == null)
            {
                return NotFound(new { message = "Comment not found" });
            }

            if (comment.AuthorId != userId)
            {
                return Forbid();
            }

            if (comment.Replies.Any())
            {
                _context.Comments.RemoveRange(comment.Replies);
            }

            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Comment has been deleted successfully" });
        }
    }
}
