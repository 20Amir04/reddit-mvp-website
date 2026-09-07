namespace Reddit_MVP_backend.DTOs
{
    public class CreateCommentDto
    {
        public string Content { get; set; } = string.Empty;

        public int? ParentCommentId { get; set; }
    }
}
