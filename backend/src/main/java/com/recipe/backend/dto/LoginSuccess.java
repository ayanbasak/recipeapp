package com.recipe.backend.dto;

public class LoginSuccess {
    private Boolean isValid;
    private String firstname;
    private String lastname;
    private Long userId;
    private String userEmail;

    public LoginSuccess(Boolean isValid, String firstname, String lastname, Long userId, String userEmail) {
        this.isValid = isValid;
        this.firstname = firstname;
        this.lastname = lastname;
        this.userId = userId;
        this.userEmail = userEmail;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public Boolean getValid() {
        return isValid;
    }

    public void setValid(Boolean valid) {
        isValid = valid;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }
}
