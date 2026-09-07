namespace Reddit_MVP_backend.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public int PostId { get; set; }
        public Post Post { get; set; } = null!;
        public string AuthorId { get; set; } = string.Empty;
        public ApplicationUser Author { get; set; } = null!;
        public int? ParentCommentId { get; set; }
        public Comment? ParentComment { get; set; }
        public ICollection<Comment> Replies { get; set; } = new List<Comment>();
    }
}
