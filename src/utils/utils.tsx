export const redirectToPage = (pageId: string, loggedIn = true) => {
  if (!loggedIn) {
    localStorage.removeItem('session_id');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_details');
  }
  window.location.href = pageId; // Redirect to login page
};
