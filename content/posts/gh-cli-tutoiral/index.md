---
author: Nisarg
date: "2025-03-31"
title: A Beginner's Guide to Setting Up and Using GitHub CLI
summary: A quick setup for you `gh` cli tool
---

As someone just starting out with command-line tools, I wanted to document how to set up, configure, and use the GitHub CLI (Command Line Interface)
for managing my GitHub repositories. The GitHub CLI, or `gh`, lets you interact with GitHub directly from
your terminal—no need to switch to a browser for common tasks like creating a repository or checking issues.
Here’s my quick guide for future reference!

## Step 1: Install GitHub CLI

First, you need to get the GitHub CLI installed on your computer. It works on Windows, macOS, and Linux, so pick the method that matches your system.

- Windows: If you have a package manager like Scoop or Chocolatey, open your terminal (e.g., Command Prompt or PowerShell) and run:

```
scoop install gh
```

or

```
choco install gh
```

Otherwise, download the installer from the [official GitHub CLI release page](https://github.com/cli/cli/releases) and run it.

- macOS: If you use Homebrew, open your terminal and type:

```
brew install gh
```

No Homebrew? Download the binary from the release page linked above.

- Linux: Use your package manager. For example, on Ubuntu or Debian:

```
sudo apt update && sudo apt install gh
```

Check the official docs for other distributions.

To confirm it’s installed, run this in your terminal:

```
gh --version
```

You should see something like `gh version 2.x.x`. If you get an error, double-check the installation steps.

## Step 2: Authenticate with GitHub

Now that `gh` is installed, you need to log in to your GitHub account from the terminal.

1. In your terminal, type:

```
gh auth login
```

2. It’ll ask how you want to authenticate. Choose GitHub.com (unless you’re using GitHub Enterprise) and press Enter.
3. Next, select HTTPS or SSH (HTTPS is simpler for beginners, so I went with that).
4. Choose Login with a web browser. It’ll give you a one-time code (like AB12-CD34).
5. Press Enter, and a browser window will pop up. Paste the code there and sign in to your GitHub account.
6. Back in the terminal, it should say “Authenticated successfully” if everything worked.

Run this to double-check:

```
gh auth status
```

You’ll see your GitHub username and confirmation that you’re logged in.

## Step 3: Configure Git (If Needed)

The GitHub CLI works with Git, so make sure Git is set up on your machine. To check, run:

```
git --version
```

If it’s not installed, download it from git-scm.com and install it. Then, set your Git username and email (replace with your own):

```
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Step 4: Start Using GitHub CLI

Now you’re ready to use `gh`! Here are some basic commands to get started:

Create a New Repository:

```
gh repo create my-new-repo --public --description "My first CLI repo"
```

This makes a public repo called my-new-repo. Swap --public with --private if you want it private.
Clone a Repository:

```
gh repo clone your-username/my-new-repo
```

This downloads the repo to your computer.
Check Open Issues:

```
gh issue list
```

Run this inside a cloned repo folder to see its issues.
Create a Pull Request: After making changes in your local repo, commit them with Git:

```
git add .
git commit -m "My first change"
git push
```

Then use `gh` to create a PR:

```
gh pr create --title "My first PR" --body "Here’s what I changed"

```

Tips for Beginners

Help is Built In: Type `gh` --help or gh <command> --help (e.g., gh repo --help) to see options.
Tab Completion: For faster typing, set up autocompletion. Run `gh` completion -s bash (or zsh, fish, etc.,
depending on your shell) and follow the instructions.

Experiment: Try commands like `gh` gist create or gh workflow list as you get more comfortable.

Wrapping Up

That’s it! With GitHub CLI, I can now manage my repos without leaving the terminal. It feels a bit intimidating at first, but starting with these basics—installing, logging in, and running simple commands—makes it manageable. I’ll keep this post handy for when I forget a step (which, as a beginner, mi`gh`t happen a lot!).

Happy coding!
