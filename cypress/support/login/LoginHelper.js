import mainData from "../../fixtures/mainData.json";
import AppHelper from "../AppHelper";

const LOCATORS = {
    ACCOUNT: {
        EMAIL: "#email",
        PASSWORD: "#passwd"
    },
    BUTTONS: {
        MAIN: {
            LOGIN: "#SubmitLogin"
        }
    },
    HEADERS: {
        MAIN: {
            TITLE: "#center_column > h1"
        }
    }
}

const login = (cy, email, password) => {
    AppHelper.enterText(cy, LOCATORS.ACCOUNT.EMAIL, email);
    AppHelper.enterText(cy, LOCATORS.ACCOUNT.PASSWORD, password);
    AppHelper.click(cy, LOCATORS.BUTTONS.MAIN.LOGIN);
}

const defaultLogin = (cy) => {
    login(cy, mainData.MAIN_ACCOUNT.EMAIL, mainData.MAIN_ACCOUNT.PASSWORD);
}

export default {
    LOCATORS, login, defaultLogin
}