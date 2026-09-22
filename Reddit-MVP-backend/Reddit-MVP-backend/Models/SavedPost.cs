namespace Reddit_MVP_backend.Models
{
    public class SavedPost
    {
        public int PostId { get; set; }
        public Post Post { get; set; } = null!;
        public string UserId { get; set; } = string.Empty;
        public ApplicationUser User { get; set; } = null!;
        public DateTime SavedAt { get; set; } = DateTime.UtcNow;
    }
}
