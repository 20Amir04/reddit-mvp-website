namespace Reddit_MVP_backend.DTOs
{
    public class CreateCommunityDto
    {
        public string Name { get; set; } = string.Empty;
        public string Description {  get; set; } = string.Empty;
            public string? BannerImageUrl { get; set; }
    }
}
