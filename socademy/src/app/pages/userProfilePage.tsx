import { UserProfile } from "../components/UserProfile";

// Placeholder-info fram til feide/database kobles til?
const placeholderUser = {
  username: "alaa",
  email: "ola.nordmann@hiof.no",
  studyPlace: "Høgskolen i Østfold",
  studentNumber: "123456",
  // birthDate - Lar denne stå tom slik at feilmeldingen kan syns.
};

export function UserProfilePage() {
  return (
    <div>
      <h1>Min profil</h1>
      <UserProfile user={placeholderUser} />
    </div>
  );
}
