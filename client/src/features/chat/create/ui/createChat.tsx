import { IconButton } from "shared/ui/iconButton"

import styles from './createChat.module.scss'

export const CreateChat = () => {

    return (
        <div className={styles.container}>
            <textarea className={styles.textArea} maxLength={100} placeholder="댓글을 입력하세요"/>
            <IconButton className="main-button">입력</IconButton>
        </div>
    )
}