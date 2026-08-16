namespace Reddit_MVP_backend.Models
{
    public class Community
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string? BannerImageUrl { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string CreatorId { get; set; } = string.Empty;
        public ApplicationUser Creator { get; set; } = null!;
        public ICollection<CommunityMember> Members { get; set; } = new List<CommunityMember>();
    }
}
