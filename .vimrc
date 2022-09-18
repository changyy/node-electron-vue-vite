try
    source $VIM/vimrc 
catch
    echo "\$VIM/vimrc not found"
endtry

try 
    let SELF_VIMRC_DIR = getenv('SELF_VIMRC_DIR')
    let SELF_VIM_DIR = SELF_VIMRC_DIR..'/.vim/'
    let SELF_VIM_AFTER_DIR = SELF_VIMRC_DIR..'/.vim/after'

    exe 'set rtp^=' . expand(SELF_VIM_DIR)
    exe 'set rtp+=' . expand(SELF_VIM_AFTER_DIR)
catch
    echo "Using getenv('SELF_VIMRC_DIR') failed"
    echo v:exception
endtry

call plug#begin()

Plug 'leafgarland/typescript-vim'
Plug 'neoclide/coc.nvim', {'branch': 'release'}

call plug#end()

syntax on
set hls
set nu
set laststatus=2
set statusline+=%F
set tabstop=2
set shiftwidth=2
set expandtab

try 
    let SELF_VIMRC_DIR = getenv('SELF_VIMRC_DIR')
    let MORE_COC_VIMCONFIG = SELF_VIMRC_DIR.'/.vimrc_coc.nvim'
    exe 'source'. expand(MORE_COC_VIMCONFIG)
catch
    echo "Using [".MORE_COC_VIMCONFIG."] failed"
    echo v:exception
endtry


