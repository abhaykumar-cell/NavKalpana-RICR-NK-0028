# NavKalpana-RICR-NK-0028
# 🎓 Academic Operations and Management Portal
## 👨‍🏫 Teacher Module (Hackathon Project)

A secure and scalable Academic Management System developed during the hackathon timeline.  
This portal enables teachers to manage students, batches, attendance, assignments, quizzes, and academic analytics.

---

# 👥 Team Members & Roles

| Name | Role | Responsibility |
|------|------|----------------|
| Abhay Kumar Bhujwa | Team Leader | Full Stack Development, Authentication, Backend Architecture |
| Bikku Kushwaha | Full Stack Developer | Batch & Attendance Module, API Integration |
| Aradhana Verma | Frontend Developer | UI/UX Design, Student Management Module |
| Krishna Chandra Pathak | PPT & Desinging |Generate PPT And manages all Non-Technical work  |

---

# 📌 Problem Statement

Build a secure Academic Operations and Management Portal that enables teachers to:

- Manage academic content
- Monitor student performance
- Evaluate assignments and quizzes
- Track attendance
- Analyze learning outcomes
- Provide structured academic insights

Hackathon Requirements Followed:

- Original project
- Developed during timeline
- Proper Git commit history
- Backend + Frontend integration
- Database integration
- Working UI
- Clean folder structure

---

# 🏗️ Project Structure 
NavKalpana-TeamCode
│
├── frontend
├── backend
├── docs
│ ├── problem-statement.pdf
│ ├── architecture-diagram.png
│ ├── api-documentation.md
│ ├── presentation.pptx
│ ├── screenshots/
│
└── README.md 


---

# 🛠️ Tech Stack Used

## Frontend
- React.js
- Material UI (MUI)
- Axios
- React Router

## Backend
- Spring Boot
- Spring Security
- JWT Authentication
- JPA / Hibernate
- Lombok

## Database
- MySQL

## Deployment (Recommended)
- Frontend → Vercel
- Backend → Render
- Database → Railway / AWS RDS

---

# 🔐 Demo Login Credentials

Email: abhay@gmail.com  
Password: Admin@123  

Authentication Flow:

Login → Validate Credentials → Generate JWT → Redirect to Dashboard

- Password hashing using bcrypt
- JWT session validity: 24 hours
- Role-based access control (Teacher only)

---

# 🚀 Installation Steps

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-repository-link.git


cd NavKalpana-TeamCode
cd backend
mvn clean install
mvn spring-boot:run

http://localhost:8080

cd frontend
npm install
npm start
