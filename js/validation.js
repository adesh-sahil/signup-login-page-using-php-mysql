const validation = new JustValidate("#signup");

validation
    .addField("#name", {
        rules: [
            {
                rule: "required"
            }
        ]
    })
    .addField("#email", {
        rules: [
            {
                rule: "required"
            },
            {
                rule: "email"
            },
            {
                name: "uniqueEmail",
                validator: (value) => {
                    return fetch("validate-email.php?email=" + encodeURIComponent(value))
                        .then(function(response) {
                            return response.json();
                        })
                        .then(function(json) {
                            return json.available;
                        });
                },
                errorMessage: "Email already taken"
            }
        ]
    })
    .addField("#password", {
        rules: [
            {
                rule: "required"
            },
            {
                rule: "minLength",
                params: 8,
                message: "Password must be at least 8 characters"
            },
            {
                rule: "contains",
                params: "a-zA-Z",
                message: "Password must contain at least one letter"
            },
            {
                rule: "contains",
                params: "0-9",
                message: "Password must contain at least one number"
            }
        ]
    })
    .addField("#password_confirmation", {
        rules: [
            {
                rule: "required"
            },
            {
                name: "matches",
                params: "#password",
                message: "Passwords should match"
            }
        ]
    })
    .onSuccess((event) => {
        // Form submission is handled automatically by Just-validate on success.
    });
