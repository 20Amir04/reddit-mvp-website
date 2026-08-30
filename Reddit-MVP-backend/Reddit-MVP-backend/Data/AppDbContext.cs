using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Reddit_MVP_backend.Models;

namespace Reddit_MVP_backend.Data
{
    public class AppDbContext : IdentityDbContext<ApplicationUser>
    {
        public AppDbContext (DbContextOptions<AppDbContext> options) :  base(options)
        {
        }

        public DbSet<TestEntity> TestEntities  { get; set; } 
        public DbSet<Community> Communities { get; set; }
        public DbSet<CommunityMember> CommunityMembers { get; set; }
        public DbSet<Post> Posts { get; set;  }
        public DbSet<PostVote> PostVotes { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Community>()
                .HasIndex(community => community.Name)
                .IsUnique();

            builder.Entity<Community>()
                .Property(community => community.Name)
                .HasMaxLength(50)
                .IsRequired();

            builder.Entity<Community>()
                .Property(community => community.Description)
                .HasMaxLength(500)
                .IsRequired();

            builder.Entity<Community>()
                .HasOne(community => community.Creator)
                .WithMany(user => user.CreatedCommunities)
                .HasForeignKey(community => community.CreatorId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<CommunityMember>()
                .HasKey(member => new {member.CommunityId, member.UserId});

            builder.Entity<CommunityMember>()
                .HasOne(member => member.Community)
                .WithMany(community => community.Members)
                .HasForeignKey(member => member.CommunityId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<CommunityMember>()
                .HasOne(member => member.User)
                .WithMany(user => user.CommunityMembership)
                .HasForeignKey(member => member.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Post>()
                .Property(post => post.Title)
                .HasMaxLength(200)
                .IsRequired();

            builder.Entity<Post>()
                .Property(post => post.Content)
                .HasMaxLength(5000)
                .IsRequired();

            builder.Entity<Post>()
                .HasOne(post => post.Author)
                .WithMany(user => user.Posts)
                .HasForeignKey(post => post.AuthorId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Post>()
                .HasOne(post => post.Community)
                .WithMany(community => community.Posts)
                .HasForeignKey(post => post.CommunityId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<PostVote>()
                .HasKey(vote => new { vote.PostId, vote.UserId });

            builder.Entity<PostVote>()
                .HasOne(vote => vote.Post)
                .WithMany(post => post.Votes)
                .HasForeignKey(vote => vote.PostId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<PostVote>()
                .HasOne(vote => vote.User)
                .WithMany(user => user.PostVotes)
                .HasForeignKey(vote => vote.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<PostVote>()
                .Property(vote => vote.Value)
                .IsRequired();
        }
    }
}
