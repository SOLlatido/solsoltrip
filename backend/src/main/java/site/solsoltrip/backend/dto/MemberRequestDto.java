package site.solsoltrip.backend.dto;

public class MemberRequestDto {
    public record signup(String email, String password, String name, String phone, String role) {}
}
