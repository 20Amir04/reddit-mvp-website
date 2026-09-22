namespace Reddit_MVP_backend.Models
{
    public class Post
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public string? ImageUrl { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public string AuthorId { get; set; } = string.Empty;
        public ApplicationUser Author { get; set; } = null!;
        public int CommunityId { get; set; }
        public Community Community { get; set; } = null!;
        public ICollection<PostVote> Votes { get; set; } = new List<PostVote>();
        public ICollection<Comment> Comments { get; set; } = new List<Comment>();
        public ICollection<SavedPost> SavedByUsers { get; set; } = new List<SavedPost>();
    }
}
