import { SessionPayload } from '@/app/lib/encrypt';
import React from 'react';


interface HeaderProps {
  session?: SessionPayload;
}

const Header: React.FC<HeaderProps> = ({ session }) => {
  let greeting = "Selamat Datang";
  let title = "";

  switch (session?.user_type) {
    case "admin":
      greeting = `Selamat Datang, ${session.name}`;
      title = "Administrator";
      break;
    case "dosen":
      greeting = `Selamat Datang, ${session.name}`;
      title = "Gelar Dosen";
      break;
    case "ketua_rg":
      greeting = `Selamat Datang, ${session.name}`;
      title = "Ketua RG";
      break;
    case "kaprodi":
      greeting = `Selamat Datang, ${session.name}`;
      title = "Kepala Program Studi";
      break;
    default:
      greeting = "Selamat Datang, Tamu";
      title = "Role Tidak Dikenal";
  }

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-text">
          <h1>{greeting}</h1>
          <p>{title}</p>
        </div>
        <div className="header-profile">
          <img
            src="/path-to-profile-image.jpg"
            alt="Profile"
            className="profile-image"
          />
          <span>{session?.name || "Pengguna"}</span>
        </div>
      </div>
      <style jsx>{`
        .header {
          background-color: #f8f9fa;
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }
        .header-text h1 {
          margin: 0;
          font-size: 1.5rem;
          color: #333;
        }
        .header-text p {
          margin: 0;
          font-size: 1rem;
          color: #666;
        }
        .header-profile {
          display: flex;
          align-items: center;
        }
        .profile-image {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 10px;
        }
      `}</style>
    </header>
  );
};

export default Header;