import {reactive, ref} from "vue";

export const useAuthForm = () => {
    const formRef = ref(null);

    const regexps = reactive({
        reUsername: /^[a-zA-Z][a-zA-Z0-9_]{6,18}$/,
        reEmail: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
        rePassword: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,16}$/
    });

    const usernameRules = reactive([
        v => !!v || "Username is required",
        v => (v && v.length >= 6 && v.length <= 18)
            || "The username must have from 6 to 18 characters",
        v => regexps.reUsername.test(v)
            || "Starts with a letter, spaces cannot be used"
    ]);

    const emailRules = reactive([
        v => !!v || "Email is required",
        v => regexps.reEmail.test(v) || "Email is invalid"
    ]);

    const passwordRules = reactive([
        v => !!v || "Password is required",
        v => (v && v.length >= 8 && v.length <= 16)
            || "The password must have from 8 to 16 characters",
        v => regexps.rePassword.test(v)
            || "Requires one number, an uppercase letter, a lowercase letter, and a special character"
    ]);

    const serverError = ref("");

    const validateForm = async () => {
        const {valid} = await formRef.value.validate();

        return valid;
    }

    return {
        formRef,
        usernameRules,
        emailRules,
        passwordRules,
        serverError,
        validateForm
    }
};