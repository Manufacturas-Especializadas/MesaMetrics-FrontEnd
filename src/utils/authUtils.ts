import { jwtDecode } from "jwt-decode";

interface AzureJwtPayload {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  exp: number;
}

export interface UserData {
  id: string;
  email: string;
  role: string;
  initials: string;
}

const getInitial = (email: string): string => {
  if (!email) return "US";

  const localPart = email.split("@")[0];

  const parts = localPart.split(".");

  if (parts.length >= 2) {
    const firstInitial = parts[0][0];
    const secondInitial = parts[1][0];

    return (firstInitial + secondInitial).toUpperCase();
  }

  return localPart.substring(0, 2).toUpperCase();
};

export const decodeUserToken = (token: string): UserData | null => {
  try {
    const decoded = jwtDecode<AzureJwtPayload>(token);

    const fullName =
      decoded[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
      ] || "Email";

    return {
      id: decoded[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ],
      email: fullName,
      role:
        decoded[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ] || "User",
      initials: getInitial(fullName),
    };
  } catch (error) {
    console.error("Error al decodifciar token", error);
    return null;
  }
};
