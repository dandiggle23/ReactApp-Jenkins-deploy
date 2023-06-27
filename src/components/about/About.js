import React, { Component } from 'react'
import classes from './About.module.css';
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";

class About extends Component {
    render() {
        return (
            <div className={classes.box} id="about">
                <ScrollAnimation offset={0} animateIn="fadeInLeft" duration={2.4} animateOnce={true} initiallyVisible={true}>
                    <span className={classes.head}>ABOUT ME</span>
                    <h2 className={classes.heading}>Who Am I?</h2>
                    <div className={classes.About}>
                        <p> My name is <b>DANIEL EMOSAIRUE</b> and I am a software engineer and currently a cloud engineering student at <a target="_blank" href="https://www.thealtschool.com/"><b>Altschool</b></a>. I completed my degree in Bachelor of education in Computer Science from  Michael Okpara University of Agriculture Umudike. I am much interested in developing new things which excite me a lot. :)  </p>
                        <p className={classes.br}>I have excellent communication skills that enable interaction in a challenging environment with developers, systems engineers, and data scientists. Alongside years of experience utilizing containerization and orchestration tools like Docker and Kubernetes, I also have a deep understanding of automation tools like Terraform, and Ansible.
                        </p>
                    </div>
                </ScrollAnimation>
            </div>
        )
    }
}

export default About;