namespace Reddit_MVP_backend.Models
{
    public class CommunityMember
    {
        public int CommunityId { get; set; }
        public Community Community { get; set; } = null!;
        public string UserId { get; set; } = string.Empty;
        public ApplicationUser User { get; set; } = null!;
        public DateTime JoinedAt { get; set; } = DateTime.UtcNow;
    }
}
