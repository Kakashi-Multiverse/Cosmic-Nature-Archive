#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Script Name: github_uploader.py
Description: Automates the process of committing and pushing Multiverse restoration files to GitHub.
Requirements: Python 3 and Git must be installed on your local machine.
"""

import os
import subprocess
import sys
import getpass

def check_git_installed():
    """Verifies if Git is installed and accessible in the system PATH."""
    try:
        subprocess.run(["git", "--version"], stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=True)
        return True
    except (subprocess.CalledProcessError, FileNotFoundError):
        print("[ERROR] Git is not installed or not found in your system's PATH.")
        print("Please download and install Git from: https://git-scm.com/")
        return False

def run_git_command(args, success_msg, error_msg):
    """Helper function to execute Git shell commands safely via subprocess."""
    try:
        result = subprocess.run(args, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, check=True)
        print(f"[SUCCESS] {success_msg}")
        return True, result.stdout
    except subprocess.CalledProcessError as e:
        print(f"[FAILED] {error_msg}")
        print(f"Error Details: {e.stderr.strip()}")
        return False, e.stderr

def upload_to_github():
    print("=" * 60)
    print("   GITHUB MULTIVERSE SYNCHRONIZATION SYSTEM (SHADOW CORE)")
    print("=" * 60)

    if not check_git_installed():
        sys.exit(1)

    # 1. Gather configuration details from the Creator
    print("\n[Step 1] Configure Repository Details:")
    github_user = input("- Enter your GitHub username: ").strip()
    repo_name = input("- Enter your GitHub Repository Name (e.g., multiverse-shadow): ").strip()
    
    print("\n*Security Note*: You will need a Personal Access Token (Classic) from GitHub.")
    print(" Path: Settings -> Developer Settings -> Personal Access Tokens -> Tokens (classic)")
    print(" Make sure to check the 'repo' scope when generating the token.")
    github_token = getpass.getpass("- Paste your Personal Access Token (input will be hidden): ").strip()

    if not github_user or not repo_name or not github_token:
        print("[ERROR] Required fields cannot be empty. Aborting process.")
        sys.exit(1)

    # 2. Initialize local Git repository if not already present
    if not os.path.exists(".git"):
        print("\n[Step 2] Initializing local Git repository...")
        success, _ = run_git_command(["git", "init"], "Successfully initialized local repository (.git).", "Failed to initialize .git.")
        if not success: sys.exit(1)
        
        # Set default branch to main
        run_git_command(["git", "checkout", "-b", "main"], "Switched default branch to 'main'.", "Failed to rename branch.")
    else:
        print("\n[Step 2] Local Git repository already exists. Proceeding with updates...")

    # 3. Create a .gitignore file to prevent uploading system trash
    if not os.path.exists(".gitignore"):
        with open(".gitignore", "w", encoding="utf-8") as f:
            f.write("__pycache__/\n*.pyc\n.DS_Store\n")
        print("-> Created default .gitignore file.")

    # 4. Stage files for commit
    print("\n[Step 3] Scanning and staging multiverse system files...")
    success, _ = run_git_command(["git", "add", "."], "Successfully staged all files in the directory.", "Failed to execute 'git add'.")
    if not success: sys.exit(1)

    # 5. Commit changes locally
    print("\n[Step 4] Creating local version commit...")
    commit_msg = "patch: update Multiverse Shadow Protocol V2.0.4 with nocturnal wildlife engine"
    success, _ = run_git_command(["git", "commit", "-m", commit_msg], f"Saved commit: '{commit_msg}'", "No new changes to commit or command error.")

    # 6. Set up Secure Remote Connection (Remote Origin) with Token
    print("\n[Step 5] Establishing secure connection tunnel to GitHub...")
    # Remove existing remote origin to prevent conflicts
    subprocess.run(["git", "remote", "remove", "origin"], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    
    # Format secured URL: https://<token>@github.com/<username>/<repo>.git
    secure_remote_url = f"https://{github_token}@github.com/{github_user}/{repo_name}.git"
    
    success, _ = run_git_command(
        ["git", "remote", "add", "origin", secure_remote_url],
        "Connected successfully to remote GitHub destination.",
        "Failed to configure remote origin."
    )
    if not success: sys.exit(1)

    # 7. Push local files to GitHub Cloud
    print("\n[Step 6] Transferring cosmic data packets to GitHub cloud...")
    print("Please wait, executing secure push sequence...")
    
    success, _ = run_git_command(
        ["git", "push", "-u", "origin", "main", "--force"],
        "SYNCHRONIZATION COMPLETED! The entire shadow sector has been uploaded to the cloud.",
        "Upload failed. Verify network connection or confirm your personal access token's validity."
    )

    if success:
        public_url = f"https://github.com/{github_user}/{repo_name}"
        print("\n" + "=" * 60)
        print("🎉 MULTIVERSE PIPELINE EXECUTION SUCCESSFUL!")
        print(f"Direct Repository Link: {public_url}")
        print("=" * 60)
    else:
        sys.exit(1)

if __name__ == "__main__":
    try:
        upload_to_github()
    except KeyboardInterrupt:
        print("\n[WARNING] Process interrupted by Creator.")
        sys.exit(0)
