using Microsoft.AspNetCore.Identity;

namespace Reddit_MVP_backend.Models
{
    public class ApplicationUser : IdentityUser
    {
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public ICollection<Community> CreatedCommunities {  get; set; } = new List<Community>();
        public ICollection<CommunityMember> CommunityMembership { get; set; } = new List<CommunityMember>();
        public ICollection<Post> Posts { get; set; } = new List<Post>();
        public ICollection<PostVote> PostVotes { get; set; } = new List<PostVote>();
        public ICollection<Comment> Comments { get; set; } = new List<Comment>(); 
    }
}
