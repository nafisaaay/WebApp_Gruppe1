type User = {
  username: string;
  email: string;
  studyPlace?: string | null;
  studentNumber?: string | null;
  birthDate?: string | null;
};

const NOT_SET = "Ikke registrert ennå.";

export function UserProfile({ user }: { user: User }) {
  return (
    <div>
      <h2>{user.username}</h2>
      <ul>
        <li><p>E-post: {user.email}</p></li>
        <li><p>Studiested: {user.studyPlace || NOT_SET}</p></li>
        <li><p>Studentnummer: {user.studentNumber || NOT_SET}</p></li>
        <li><p>Fødselsdato: {user.birthDate || NOT_SET}</p></li>
      </ul>
    </div>
  );
}
