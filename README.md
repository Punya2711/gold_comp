# 🪙 Rayaru Gold Buying Company Website

A modern, responsive website built for **Rayaru Gold Buying Company** featuring a professional customer-facing interface along with a secure admin dashboard to manage live gold prices.

🌐 **Live Website:** https://rayarugoldbuyers.com

---

# 📌 About the Project

Rayaru Gold Buying Company is a trusted gold buying business based in Bangalore. This project was developed to provide them with a professional online presence while allowing administrators to update daily gold prices without modifying the website's source code.

The website focuses on trust, transparency, simplicity and responsive design.

---

# ✨ Features

## Customer Website

- Responsive modern UI
- Home page
- About page
- Services page
- Contact page
- Live Gold Price section
- Contact Form
- Mobile Friendly Design
- Smooth animations using Framer Motion

---

## Admin Dashboard

Secure admin login

Administrator can:

- Login securely
- Update 24K Gold Price
- Update 22K Gold Price
- View Contact Form submissions
- Logout securely

The public website instantly reflects the updated prices.

---

# 🛠 Tech Stack

### Frontend

- Next.js 15
- React
- Tailwind CSS
- Framer Motion
- Lucide React Icons

### Backend

- Next.js API Routes

### Database

- MongoDB Atlas

### Deployment

- Vercel

### Domain

- GoDaddy

---

# 📂 Project Structure

```
app/
│
├── about/
├── admin/
├── api/
├── contact/
├── services/
│
components/
│
├── Navbar
├── Footer
├── GoldPriceCard
├── Logo
│
public/
│
lib/
│
hooks/
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/Punya2711/gold_comp.git
```

Move into the project

```bash
cd gold_comp
```

---

## Install Dependencies

```bash
npm install
```

---

## Environment Variables

Create a file named

```
.env.local
```

Add the following

```env
MONGO_URL=your_mongodb_connection_string
DB_NAME=rayaru_gold
```

Example

```env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/?appName=Rayaru
DB_NAME=rayaru_gold
```

> Never upload `.env.local` to GitHub.

---

## Run the Project

```bash
npm run dev
```

Open

```
http://localhost:3000
```

---

# 🗄 Database

The project uses **MongoDB Atlas**.

Collections used:

```
admins
contacts
sessions
settings
```

The API automatically seeds the database with:

- Default Admin
- Initial Gold Prices

---

# 🔐 Admin Login

The admin panel allows authorized users to manage the website without touching the source code.

Functions include

- Login
- Authentication
- Gold Price Updates
- Contact Management

---

# 🌐 Deployment

The project is deployed using

- Vercel
- MongoDB Atlas
- GoDaddy Custom Domain

Deployment Steps

1. Push project to GitHub
2. Import repository into Vercel
3. Add Environment Variables
4. Deploy
5. Connect custom domain
6. Update DNS records
7. Wait for DNS propagation

---

# 📱 Responsive Design

The website is optimized for

- Desktop
- Laptop
- Tablet
- Mobile Devices

---

# 🎨 Design Highlights

- Luxury gold theme
- Elegant typography
- Smooth page animations
- Professional business layout
- Fast loading
- Clean user experience

---

# 🔒 Security

- MongoDB Atlas Authentication
- Environment Variables
- Secure Admin Sessions
- Password Hashing
- Protected API Routes

---

# 📸 Screens

- Home
- About
- Services
- Contact
- Admin Login
- Admin Dashboard

---

# Future Improvements

- Email notifications
- WhatsApp integration
- SMS alerts
- Appointment booking
- Customer dashboard
- Gold rate history graphs
- SEO optimization
- Analytics dashboard
- Blog section

---

# 👩‍💻 Developed By

**Punya H S**

Computer Science Engineering Student

GitHub:
https://github.com/Punya2711

LinkedIn:
https://www.linkedin.com/in/punyahsp27/

---

# 📄 License

This project was developed as a client project for **Rayaru Gold Buying Company**.

All business branding, logos, and content belong to Rayaru Gold Buying Company.

The source code is intended for educational and portfolio purposes unless otherwise authorized.
