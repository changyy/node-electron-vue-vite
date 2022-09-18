#!/bin/sh
SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]:-$0}"; )" &> /dev/null && pwd 2> /dev/null; )";
export SELF_VIMRC_DIR=$SCRIPT_DIR
alias vim='vim -u $SCRIPT_DIR/.vimrc'
echo "Update vim environment (using 'type vim' to show raw command) "

# https://github.com/junegunn/vim-plug
#curl -fLo ~/.vim/autoload/plug.vim --create-dirs https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
if [ ! -e $SCRIPT_DIR/.vim/autoload ] ; then
    mkdir -p $SCRIPT_DIR/.vim/autoload
fi

if [ ! -e $SCRIPT_DIR/.vim/autoload/plug.vim ]; then
    curl -fLo $SCRIPT_DIR/.vim/autoload/plug.vim --create-dirs https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
fi

if [ ! -e $SCRIPT_DIR/.vim/plugged ]; then
    # https://superuser.com/questions/451863/how-to-run-vim-command-from-the-shell
    vim -c 'PlugInstall'
fi
