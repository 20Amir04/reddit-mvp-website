namespace Reddit_MVP_backend.Models
{
    public class PostVote
    {
        public int PostId {  get; set; }
        public Post Post { get; set; } = null!;
        public string UserId { get; set; } = string.Empty;
        public ApplicationUser User { get; set; } = null!;
        public int Value { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
