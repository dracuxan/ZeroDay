---
title: Neovim for losers
description: How does a loser move to Neovim from other inferior editors?
date: 2025-12-17
tags:
  - tech
  - guide
---
## A Walk-through of my Neovim setup/config

![[neovim_btw.png]]

Well... this is my first blog post, so I was thinking of adding some kind of back story on 'why I got into vim' or 'my motivation' for using it and stuff. But tbvh there is no such thing as motivation for me. I do as I see fit and the world will lead me to the answer - that’s my entire philosophy. 

So yea, this poast is just me bragging about my plugins, settings choices and how to set it up on your machine. 

If you're of same species as me (blod brethren) just close this tab right now, go clone [[https://github.com/nvim-lua/kickstart.nvim|kickstart.nvim]], or watch [[https://youtu.be/m8C0Cq9Uv9o?si=5gOHdX3OTEmw-1lq|TJ’s Guide]] on YT and start tinkering.

Still here? Fineee… let me show you how I set mine up.

## Getting the source from the GitHub repo

Just run this in your terminal:

```bash
git clone https://github.com/dracuxan/nix-dots.git ~/nix-dots && cd ~/nix-dots
```

> Note: I would suggest to fork it first. That way you can push your own tweaks later.

Next: actually installing Neovim depending on your distro (no, I’m not even considering a Windows users will read this).

### Debian-based distros
```bash
sudo apt install neovim
```
> Note: `apt` gives you the older/stable version. You will have to build from source yourself if you want a newer version. (Figure this out yourself unc)

### Arch (btw) users
```bash
sudo pacman -S neovim
```

### NixOS users (me)
```nix
environment.systemPackages = [ pkgs.neovim ];
```

Installation done. Now let’s throw my config into place (move it to `~/.config` directory).

## Two ways to do it

### 1. Using stow (my prefered way)
If you have [[https://www.gnu.org/software/stow/|stow]] installed (or install it), life becomes easier.

1. Make sure the folder exists
```bash
mkdir -p "$HOME/.config/nvim"
```

2. Symlink it from the dotfiles folder to `~/.config`
```bash
stow --adopt -d "~/nix-dots" -t "$HOME/.config/nvim" nvim
```
> Note: Change `~/nix-dots` if you cloned it somewhere else, and run this from inside that directory.

Done. Ez.

### 2. Copy-paste (you monkey)
Just copy the whole folder. Backup your old config first if you have one.

```bash
cp -rf ./nvim ~/.config/nvim
```

Now open Neovim, poke around, break shit, understand nothing or just keep reading if you’re here for the vibes (you should touch some grass instead imo).

## Deep dive into the config

### init.lua
This is the file that brings it all together and links all sub-folders and files - is how i like to picture it.

```lua
require("core.options")
require("core.keymaps")
require("plugins.lazy")
```

That’s literally it. Want to know how Lua works? Go read the [[https://www.lua.org/docs.html|official docs]] (I never did tho).
### lazy-lock.json

It’s just a lockfile that pins every plugin to the exact git commit that’s currently working. Keeps your setup identical on every machine and stops random updates from breaking shit. Commit it, DO NOT edit it by hand. That’s it.

### Keybindings

All the bindings can be found in `lua/core/keymaps.lua`. Everything here is built around two rules:
- My hands almost never leave home row
- They don’t clash with my tmux prefix which is `<C-n>` (yea, I’m weird, deal with it)

So I deliberately avoided binding `<C-h/j/k/l>` in normal mode for window navigation. Neovim and tmux just magically (a lie) understand each other with `<C-h/j/k/l>` (I use a plugin for this). No extra bindings needed.

Keep this in mind before you start changing stuff
- `<leader>` = Space (set with vim.g.mapleader = " ")
- `<C->` = Ctrl + key
- Everything here uses the opts = `{ noremap = true, silent = true }` table so no recursion occurs
### Options

All this stuff lives in `lua/core/options.lua`.  
I’m not gonna explain every single line, just the ones that actually matter to me on a daily basis and the reason behind them.

Feel free to tweak it to your taste.

- **Line numbers**  
  ```lua
  vim.wo.number = true
  vim.o.relativenumber = true
  ```

- **Clipboard = system clipboard**  
  ```lua
  vim.o.clipboard = "unnamedplus"
  ```

- **2-space indentation everywhere (this is the only way)**  
  ```lua
  vim.o.shiftwidth = 2
  vim.o.tabstop = 2
  vim.o.softtabstop = 2
  vim.o.expandtab = true
  ```

- **Searching**  
  ```lua
  vim.o.ignorecase = true
  vim.o.smartcase = true
  vim.o.hlsearch = false
  ```
 >Case-insensitive unless I type a capital. And no annoying highlight leftover after search

- **Splits**  
  ```lua
  vim.o.splitbelow = true
  vim.o.splitright = true
  ```

- **Undo forever**  
  ```lua
  vim.o.undofile = true
  ```

- **No swapfile / backup clutter**  
  ```lua
  vim.o.swapfile = false
  vim.o.backup = false
  vim.o.writebackup = false
  ```
>I have git and undofile instead.

- **Faster everything**  
  ```lua
  vim.o.updatetime = 250   -- git signs, CursorHold, etc.
  vim.o.timeoutlen = 300   -- which-key pops up fast
  ```

#### Honorable mentions
- Mouse completely disabled: `vim.o.mouse = ""`  
- Current line highlight: `vim.o.cursorline = true`
- Sign column always visible: `vim.wo.signcolumn = "yes"`  
- Nice popup menu: `vim.o.completeopt = "menuone,noselect"`  
- Invisible characters (only when I really need them)  
  ```lua
  vim.opt.list = true
  vim.opt.listchars = { tab = "· ", trail = "·", extends = ">", precedes = "<" }
  ```
- True colors: `vim.opt.termguicolors = true`

#### The minimal tabline at the top
I hated the default tabline so I wrote my own in like 15 lines (copy pasted from some another dots):
- Shows only the filename (not the full path)
- Completely transparent background

```lua
_G.MyTabLabel = function(n) ... end
_G.MyTabLine   = function() ... end
vim.o.tabline = "%!v:lua.MyTabLine()"
```
### Plugins

Everything is managed by `lazy.nvim`. First here’s the short version of what’s actually installed:
- `vesper.nvim` – My colorscheme. Dark and sexy.
- `fzf-lua` – A fuzzy finder. Does everything Telescope wishes it could.
- `oil.nvim` – File explorer that treats your filesystem like a buffer. `-` to open, edit paths directly.
- `toggleterm.nvim` – Terminal plugin for Neovim. I have lazygit, and a few custom commands bound.
- `lualine.nvim` – Statusline.
- `which-key.nvim` – Pops up hints when I forget my own keybinds.
- `auto-session` – Automatically saves/restores sessions. 
- `vim-wakatime` – I love keeping track of my coding hours.
### Misc Plugins 

These live in `lua/plugins/misic.lua` (yes, I know it’s spelled wrong).

- `vim-sleuth` - Automatically detects `shiftwidth` and `expandtab` from the file. 
- `nvim-autopairs` - Closes parentheses, brackets, quotes, etc.(I forgot it was a plugin lol)
- `todo-comments.nvim` - Makes `TODO:`, `FIXME:`, `HACK:`, `NOTE:` , etc.
- `nvim-tmux-navigation` - Lets me do `<C-h/j/k/l>` to move between Neovim splits AND tmux panes. (see it's not magic)

### How to add a new plugin (mini guide)

1. Create a new file in `lua/plugins/` called whatever you want (e.g. `my-plugin.lua`)  
2. Make it return a proper lazy plugin spec, example:

   ```lua
   return {
     "jhondoe/some-plugin",
     event = "VeryLazy"
     config = function()
       require("some-plugin").setup({
         -- your options here
       })
     end,
   }
   ```

3. Add it to the big list in `lua/plugins/lazy.lua`:

   ```lua
   local custom_plugins = {
     require("plugins.fzf-lua"),
     require("plugins.misic"),
     -- ... 
     require("plugins.some-plugin"),  -- just add it here
   }
   ```

4. Save → open Neovim → `:Lazy` → watch it install. Done.

If the plugin is tiny and needs almost no config, just throw it in `misic.lua`/`lazy.lua` instead.  

### Finally LSP and Language support

All the LSP/autocompletion/formatting lives in `lua/plugins/lsp.lua` and `lua/plugins/languages.lua`.

What’s actually installed:
- `nvim-treesitter` – Syntax highlighting, folding, textobjects, autotag in JSX/TSX. Updates itself with `:TSUpdate`.
- `nvim-cmp + LuaSnip + friendly-snippets` – Autocompletion.
- `none-ls` (with mason-null-ls) – Formatters and linters for everything that doesn’t have a proper LSP (prettier, stylua, golines, etc.).
- `nvim-ts-autotag` – Auto-closes/renames HTML/JSX tags. Works out of the box on React/TS files.
- `gopher.nvim` – Go-specific commands (`:GoTagAdd`, `:GoTest`, etc.)
- `nvim-dap + dap-virtual-text` – Debugger framework. I almost never use it, but it’s there in case I feel like being a real engineer one day.

Points to note:
- I let `mason.nvim` handle all LSP servers. Run `:Mason` once and install everything you need (tsserver, gopls, rust-analyzer, pyright, etc.).
- Formatting on save is on by default for everything that has a formatter.
- Keybinds for LSP:
  - `gd` - go to definition
  - `gr` - references
  - `K`  - hover
  - `<leader>ca` - code actions
  - Diagnostics float with `<leader>d`

That’s it. Done. Now go and poast on X - I use NeoVim btw.

### Why build this from scratch when distros exist? 
(Hidden at the bottom so no one actually argues with me)

Now hear me out, if you’re coming from VS\*ode or some other bloated GUI editor, you already know the pain of 500MB updates, random freezes, and extensions that break randomly (ngl, Neovim can break too). Neovim from scratch is the opposite: it’s lean, it’s yours, and it lives in the terminal.

A distro like LazyVim or AstroNvim just gives you the same bloated feeling, only now it’s in a terminal and someone else wrote 5000 lines of config you don’t understand. It’s VS\*ode terminal edition.

Yeah, it hurts like hell for the first week. But one day it just clicks and you’ll never touch a mouse again.

So yeah, that’s why. If you still think distros are the way, cool, enjoy your 300-plugin setup. I’ll be over here sipping tea in 0.07 s boot time.

> (If you disagree, I don’t care. argue with your configs, not me.)

Peace out,  
dracuxan