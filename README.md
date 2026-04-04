# PH Healthcare Frontend

<p align="center">
  Modern healthcare platform frontend built with Next.js 16, React 19, Tailwind CSS 4, and TypeScript.
</p>

<p align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16.2.2-black" />
  <img alt="React" src="https://img.shields.io/badge/React-19.2.4-149ECA" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.x-3178C6" />
  <img alt="Tailwind" src="https://img.shields.io/badge/Tailwind-4.x-06B6D4" />
</p>

---

## Project Snapshot

- Framework: Next.js (App Router)
- Language: TypeScript
- Styling: Tailwind CSS + shadcn/ui
- Goal: Role-based healthcare management experience for admin, doctor, and patient workflows

---

## Route Access Map

### Public Routes

| Route           | Description       |
| --------------- | ----------------- |
| `/`             | Home page         |
| `/consultation` | Consultation page |
| `/digonostic`   | Diagnostic page   |
| `/medicine`     | Medicine page     |
| `/about`        | About page        |
| `/contact`      | Contact page      |
| `/policy`       | Policy page       |

### Public Routes (Unauthenticated Only)

| Route              | Description          |
| ------------------ | -------------------- |
| `/login`           | Login page           |
| `/register`        | Register page        |
| `/forgot-password` | Forgot password page |
| `/reset-password`  | Reset password page  |
| `/verify-email`    | Verify email page    |

### Private Routes (All Authenticated Roles)

| Route              | Description          |
| ------------------ | -------------------- |
| `/change-password` | Change password page |
| `/my-profile`      | My profile page      |
|                    |

### Private Routes (Admin / Super Admin)

| Route                                      | Description             |
| ------------------------------------------ | ----------------------- |
| `/admin/dashboard`                         | Admin dashboard         |
| `/admin/dashboard/admins-management`       | Admins management       |
| `/admin/dashboard/doctors-management`      | Doctors management      |
| `/admin/dashboard/schedules-management`    | Schedules management    |
| `/admin/dashboard/appointments-management` | Appointments management |

### Private Routes (Doctor)

| Route                             | Description      |
| --------------------------------- | ---------------- |
| `/doctor/dashboard`               | Doctor dashboard |
| `/doctor/dashboard/appointments`  | Appointments     |
| `/doctor/dashboard/my-schedule`   | My schedule      |
| `/doctor/dashboard/prescriptions` | Prescriptions    |

### Private Routes (Patient)

| Route               | Description          |
| ------------------- | -------------------- |
| `/dashboard`        | Patient dashboard    |
| `/book-appointment` | Book appointment     |
| `/my-appointments`  | My appointments      |
| `/prescriptions`    | Prescriptions        |
| `health-records`    | Health records       |
| `/payment/success`  | Payment success page |

---

## Local Development

```bash
bun install
bun run dev
```

Open `http://localhost:3000` in your browser.

---

## Scripts

| Command         | Action                   |
| --------------- | ------------------------ |
| `bun run dev`   | Start development server |
| `bun run build` | Create production build  |
| `bun run start` | Run production server    |
| `bun run lint`  | Run lint checks          |

---

## Notes

- Route names above are documented as currently defined in this project.
- Protected routes depend on authentication and role-based authorization logic.
