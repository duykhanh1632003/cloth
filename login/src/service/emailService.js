require('dotenv').config();
import nodemailer from 'nodemailer'

let sendSimpleEmail = async (data) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD
    }
  });
  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <duykhanh1632003@gmail.com>',
    to: "duykhanh1632003@gmail.com",
    subject: "Thông tin sản phẩm của bạn",
	html: `
    <p>Sản phẩm mới từ nhà SWE</p>
    <p>Chi tiết sản phẩm:</p>
    ${bodyHTMLEmail(data)}
    <p>Cảm ơn bạn đã mua hàng từ chúng tôi</p>
    <ul>
      LƯU Ý: Hạn chế sử dụng máy sấy nhiệt cao để giữ form áo.
    </ul>
  `,
  });
  
}

let bodyHTMLEmail = (data) => {
	let result = '<h3>';
  
	if (data && data.length > 0) {
	  result += 'Chi tiết sản phẩm:<br>';
	  data.forEach((item, index) => {
		result += `${item.name} có giá là ${item.totalMoneyCart}<br>`;
	  });
	} else {
	  result += 'Không có dữ liệu';
	}
  
	result += '</h3>';
  
	return result;
  };
  

module.exports = {
  sendSimpleEmail
}
