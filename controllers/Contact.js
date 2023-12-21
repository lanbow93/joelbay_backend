import express from "express";
import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";
dotenv.config()
import { failedRequest, successfulRequest } from '../utils/SharedFunctions.js';

const router = express.Router()

router.put("/iteminquiry", async (request, response) => {
    try {
        request.body.email = request.body.email.toLowerCase()
            try {
                // Beginning of sending autogenerated email
                await sgMail.setApiKey(process.env.SENDGRID_API_KEY || "")
                const msg = {
                    to: `${process.env.RECEIVINGEMAIL}`,
                    from: "speedycheckin.automated@gmail.com",
                    subject: "Joelbay Item Inquiry",
                    text: "Joelbay Item Inquiry",
                    html: `<html lang="en">
                    <head></head>
                    <body>
                      <table style="width:100%; border-collapse:collapse;">
                        <tr>
                          <th colspan='2' style="border:1px solid #ddd; padding:12px; text-align:center; background-color:#f2f2f2;font-weight: bold; font-size: 20px;">Joelbay Collections Item Inquiry</th>
                        </tr>
                        <tr>
                          <td style="border:2px solid #ddd; padding:12px; text-align:left;">Item Name:</td>
                          <td style="border:2px solid #ddd; padding:12px; text-align:left; font-weight: bold; font-size: 18px;">${request.body.itemName}</td>
                        </tr>
                        <tr>
                          <td style="border:2px solid #ddd; padding:12px; text-align:left;">Requestor Name:</td>
                          <td style="border:2px solid #ddd; padding:12px; text-align:left; font-weight: bold; font-size: 18px;">${request.body.name}</td>
                        </tr>
                        <tr>
                          <td style="border:2px solid #ddd; padding:12px; text-align:left;">Requestor Email:</td>
                          <td style="border:2px solid #ddd; padding:12px; text-align:left; font-weight: bold; font-size: 18px;">${request.body.email}</td>
                        </tr>
                        <tr>
                          <td style="border:2px solid #ddd; padding:12px; text-align:left;">Item Image:</td>
                          <td style="border:2px solid #ddd; padding:12px; text-align:left;">
                            <img src=${request.body.imageUrl} alt=${request.body.itemName} style="max-width:100%; height:auto;" />
                          </td>
                        </tr>
                        <tr>
                          <td style="border:2px solid #ddd; padding:12px; text-align:left;">Message from Buyer:</td>
                          <td style="border:2px solid #ddd; padding:12px; text-align:left;font-size: 20px;">${request.body.message}</td>
                        </tr>
                        <tr>
                          <td colspan='2' style="border:2px solid #ddd; padding:12px; text-align:center; font-size: 18px;">
                            <a href=${request.body.link}>To Item Page</a>
                          </td>
                        </tr>
                      </table>
                    </body>
                    </html>`
                }
                await sgMail.send(msg)
                successfulRequest(response, 'Email Sent Successfully', 'Check Email For Next Steps', "Success")
    
            }catch(error){
                failedRequest(response, 'Unable To Process Email', 'Unable to Email', {error})
            }
    }catch(error){
        failedRequest(response, "Email Does Not Exist", "Unable To Locate Email", {error})
    }
})

export default router