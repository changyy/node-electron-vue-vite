#!/bin/sh
SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]:-$0}"; )" &> /dev/null && pwd 2> /dev/null; )";
source $SCRIPT_DIR/env_nvm.sh
source $SCRIPT_DIR/env_vim.sh

PATH=$PATH:node_modules/typescript/bin/
