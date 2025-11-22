# RosterUp Beta Testing Guide

Use this checklist to verify the core functionality of the RosterUp mobile app.

## 1. Authentication & Onboarding

- [ ] **Sign Up**: Create a new account. Verify you are redirected to the Onboarding screen.
- [ ] **Role Selection**: Select "Player" and verify you go to the Player Tabs.
- [ ] **Role Selection**: Select "Team" and verify you go to the Team Tabs.
- [ ] **Login**: Log out and log back in. Verify session persistence.

## 2. Player Experience

- [ ] **Profile**: Go to the Profile tab.
- [ ] **Create Card**: Fill out the player card form and save. Verify the "Preview" updates.
- [ ] **Edit Card**: Change some values and save again. Verify updates persist.
- [ ] **Browse Tryouts**: Go to the Home tab. Verify you see a list of tryouts (if any exist).
- [ ] **Filter**: Use the role filter (e.g., "IGL"). Verify the list updates.
- [ ] **Apply**: Tap a tryout. Click "Apply". Verify success toast.
- [ ] **Duplicate Apply**: Try to apply to the same tryout again. Verify error toast ("already applied").
- [ ] **My Applications**: Go to the Applications tab. Verify your new application is listed with status "Pending".

## 3. Team Experience

- [ ] **Team Setup**: Log in as a new Team user. Verify you are prompted to create a team.
- [ ] **Create Team**: Create a team. Verify you land on the Team Dashboard.
- [ ] **Dashboard**: Verify your team name and tier are displayed.
- [ ] **Post Recruitment**: Click "Post". Fill out the form. Verify success.
- [ ] **View Recruitments**: Back on Dashboard, verify the new recruitment appears in the list.
- [ ] **Manage Applications**: Click "Manage" on a recruitment.
- [ ] **View Applicants**: Verify you see players who applied.
- [ ] **Update Status**: Shortlist or Reject an applicant. Verify the status updates immediately.

## 4. Edge Cases & UI

- [ ] **Network**: Turn off WiFi/Data. Verify the app shows an "Offline" or error state (if implemented) or handles it gracefully.
- [ ] **Empty States**: Check screens with no data (e.g., new account Applications tab). Verify "Empty State" component is shown.
- [ ] **Loading**: Verify Skeletons appear while data is fetching.
- [ ] **Glassmorphism**: Check that the tab bar and cards have the blur effect.

## 5. Reporting Bugs

If you find an issue, please note:

- Screen Name
- Steps to Reproduce
- Expected vs Actual Behavior
