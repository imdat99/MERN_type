import nodemailer from 'nodemailer'
import { Response } from "express";
import asyncWrapper from './asyncWrapper'
import returnRes from './returnRes'


const encodeEmail = (email: string) => {
    const aa = email.split('@')
    const len = aa[0].length - 1
    let enc = aa[0][0]
    for (var i = 1; i < 3; i++) {
        enc += '*'
    }
    enc += aa[0][len]
    aa[0] = enc
    return aa.join('@')
}


const sendMail = async (email: string, tempToken: string, res: Response) => {
    try {

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'phieubengao@gmail.com',
                pass: 'geqdeynowturpgut'
            }
        });

        let mailOptions = {
            from: 'phieubengao@gmail.com',
            to: email,
            subject: 'Reset Todo password',
            text: `Click this link to reset password: https://vite-todo123.netlify.app/reset/${tempToken.replace(/\./g, '_')}`
        };

        await transporter.sendMail(mailOptions, function (error, _) {
            if (error) {
                console.log(error);
            } else {
                console.log(tempToken.replace(/\./g, '_'))
                return returnRes.res200(res, {}, `Reset password link has been send to ${encodeEmail(email)}`)
            }
        });
    }
    catch (e) {
        returnRes.res500(res)
    }
}

export default sendMail