const allowedDomains = [
  "csepup.ac.in",
  "pbiuni.in"
];

export const isAllowedEmail = (email) => {
  try {
    const domain = email.split("@")[1]?.toLowerCase();
    return allowedDomains.includes(domain);
  } catch {
    return false;
  }
};
