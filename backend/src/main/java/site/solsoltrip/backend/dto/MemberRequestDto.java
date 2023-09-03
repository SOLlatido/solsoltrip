package site.solsoltrip.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class MemberRequestDto {
    public record signup(
            @NotBlank
            @Pattern(regexp="^[a-zA-Z]+[!#$%&'*+-/=?^_`(){|}~]*[a-zA-Z0-9]*@[\\w]+\\.[a-zA-Z0-9-]+[.]*[a-zA-Z0-9]+$", message = "이메일 형식에 맞게 입력해주세요.")
            String email,

            @NotBlank
            @Pattern(regexp="^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$", message = "비밀번호는 영문, 숫자, 특수기호 조합으로 8자리 이상 입력해주세요.")
            String password,

            @NotBlank
            @Pattern(regexp="^010([0-9]{8})$", message = "전화번호는 하이픈 없이, 010으로 시작하는 11자리 숫자를 입력해주세요.")
            String phone,

            String role) {}
}
