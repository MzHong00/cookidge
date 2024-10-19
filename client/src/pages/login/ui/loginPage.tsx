import { Logo } from "shared/ui/logo"
import { LoginBox } from "widgets/login"

import styles from './loginPage.module.css'

const LoginPage = () => {

    return (
        <div className={styles.page}>
            <Logo className={styles.logo}/>
            <LoginBox className={styles.loginBox}/>
        </div>
    )
}

export default LoginPage;