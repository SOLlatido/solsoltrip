package site.solsoltrip.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class MemberRequestDto {
    public record signup(
            @NotBlank
            @Pattern(regexp="^[a-zA-Z][0-9a-zA-Z]{5,19}$", message = "아이디는 영문자로 시작하여 6자리 이상 20자리 이하로 입력해주세요.")
            String id,

            @NotBlank
            @Pattern(regexp="^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$", message = "비밀번호는 영문, 숫자, 특수기호 조합으로 8자리 이상 입력해주세요.")
            String password,

            @NotBlank
            @Pattern(regexp="[ㄱ-ㅎ가-핳]{2,10}", message = "이름은 한글만으로 2자 이상, 10자 이내로 입력해주세요.")
            String name,

            @NotBlank
            @Pattern(regexp="^010([0-9]{8})$", message = "전화번호는 하이픈 없이, 010으로 시작하는 11자리 숫자를 입력해주세요.")
            String phone) {}

        public record login(
                @NotBlank
                String id,

                @NotBlank
                String password) {}
}
