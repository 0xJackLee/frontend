import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import axios from 'axios';
import { BASE_URL, SOLIDITY_COURSE_ID } from '@site/src/configs/request';
import { useUser } from "../../hooks/useUser";

export default function QuizDashboard() {

    const [courseLessons, setCourseLessons] = useState([]);
    const [accessToken, setAccessToken] = useState(null);

	const user = useUser();
	const isSignIn = user !== null;

    const quizCertificationImg = require('@site/static/img/soliditylogo.png').default;

    useEffect(() => {

        axios.get(`${BASE_URL}/courses/${SOLIDITY_COURSE_ID}/lessons`)
            .then((response) => {
                setCourseLessons(response.data.data['list'])
            })

        if (isSignIn) {
            setAccessToken(JSON.parse(localStorage.getItem('supabase.auth.token'))['currentSession']['access_token']);
            axios.defaults.headers.post['Authorization'] = `Bearer ${accessToken}`;
        }
    }, [])

    function applyGraduate(){

        axios.post(`${BASE_URL}/courses/${SOLIDITY_COURSE_ID}/graduate`,{
                course_id : SOLIDITY_COURSE_ID
            })
            .then((response) => {
                console.log(response);
            })
    }

    function Course({id, sort, estimated_time, title, route_path}) {
        return (
            <li className={styles.quizListItem}>
                {/* <Link to={route_path}> */}
                    <div >{sort}.{title}({estimated_time})</div>
                    <div></div>
                {/* </Link> */}
            </li>
        );
    }
    
    return (
        <div className={styles.quizDashboard}>
            <div className={styles.quizToc}>
                <h2>目录</h2>
                <div className={styles.quizBox}>
                    <ul className={styles.quizList}>
                        {courseLessons.map((props, idx) => (
                            <Course key={idx} {...props} />
                        ))}
                    </ul>
                    <div className={styles.quizGraduateBox}>
                        <div className={styles.quizGraduateBtn} onClick={applyGraduate}>
                            <p>毕业</p>
                        </div>
                    </div>
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
