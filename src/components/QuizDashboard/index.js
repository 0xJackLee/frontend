import React from 'react';
import Link from '@docusaurus/Link';
import {useHistory} from "@docusaurus/router";
import {useRequest} from "ahooks";
import get from 'lodash/get';
import styles from './styles.module.css';
import {getLessons} from "../../api/course";

import { SOLIDITY_COURSE_ID } from '@site/src/constants/course';

const quizCertificationImg = require('@site/static/img/soliditylogo.png').default;

export default function QuizDashboard(props) {
    const {courseId} = props;
    const {data} = useRequest(() => getLessons(courseId));
    const history = useHistory();

    function Course({id, sort, estimated_time, lesson_title, score_percent, is_finish, route_path}) {
        return (
            <li className={styles.quizListItem}>
                <Link to={`/${route_path}`}>
                    <div className={styles.quizListItemInner}>{sort}.{lesson_title}({estimated_time})</div>
                    <div className={styles.quizListItemInner}>{is_finish ? '✅' : '❌'}({score_percent}%)</div>
                </Link>
            </li>
        );
    }
    
    return (
        <div className={styles.quizDashboard}>
            <div className={styles.quizToc}>
                <h2>目录</h2>
                <div className={styles.quizBox}>
                    <ul className={styles.quizList}>
                        {get(data, 'data.list', []).map((props, idx) => (
                            <Course key={idx} {...props} />
                        ))}
                    </ul>
                    if( courseId == SOLIDITY_COURSE_ID){
                        <div className={styles.quizGraduateBox}>
                            <div className={styles.quizGraduateBtn} onClick={() => history.push(`/certificate?cid=${courseId}`)}>
                                <p>毕业</p>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className={styles.quizCertification}>
                <h2>技术认证</h2>
                <div className={styles.quizCertificationContent}>
                    <img src={quizCertificationImg} />
                    <div className={styles.quizCertificationText}>
                        <p>赢取SBT技术认证 🔥</p>
                        <p>通过全部考试，赢取灵魂绑定（SBT）的技术认证！你可以在社交媒体上炫耀，并把它添加到你的简历中！</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
