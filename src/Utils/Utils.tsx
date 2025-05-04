import { getProperties, getUrl } from '@aws-amplify/storage'
import { getCurrentUser, signOut } from '@aws-amplify/auth'

export   const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
export const generateCode = (): string => Math.floor(1000 + Math.random() * 9000).toString();

export const fetchImageMetadata = async (fileKey: string) => {
  const url  :any = await getUrl({
    key: fileKey,
    options: {
      accessLevel: 'private',
      expiresIn: 300,
    },
  });

  try {
    const result = await getProperties({
      key: fileKey,
      options: {
        accessLevel: 'private',
      },
    });

    const lastModified = result.lastModified
      ? new Date(result.lastModified)
      : new Date(0); // fallback to epoch if undefined
    return {
      code: result.metadata?.code || '',
      lastModified: lastModified,
      imageUrl:url.url
    };
  } catch (error) {
    console.error(`Error fetching metadata for ${fileKey}:`, error);
    return { code: '', lastModified: new Date(0),imageUrl:'' }; // fallback to epoch
  }
};

export  const logoutPreviousUsers = async ()=>{
  try {
    // Check if someone is already logged in
    const currentUser = await getCurrentUser();
    console.log("cyrrent ==== > ",currentUser)
    if (currentUser) {
      console.log('🔄 Existing user detected. Logging out...');
      await signOut(); // Sign out existing session
    }
  } catch (err) {
    // No user was signed in, so we can safely ignore this error
    console.log('✅ No existing user session found.');
  }
}

export function extractAfterColon(message: string): string {
  const parts = message.split(':');
  return parts.length > 1 ? parts[1].trim() : message;
}