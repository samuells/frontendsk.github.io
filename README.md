# FrontEnd website

 - the website is a conventional structure that uses Hexo generator
 - theme and articles are submodules
 - file .gitmodules is committed, so there is no need to care about 

<br><br>

## Clone repo with (submodules) theme and articles

**Clones repo to the folder "frontend"**  
`git clone https://github.com/frontendsk/website frontendsk`  
`cd frontendsk`  

**Clone submodules to the subfolders by the hexo convention**  
`git submodule init` 
`git submodule update`
	
**Clone submodules to the subfolders by the hexo convention**  
`npm install` # install hexo packages  
`cd themes/theme-v3/` # go to the theme  
`npm install` # install themes packages  
`cd ../../` # go back to the root

<br><br>

## Run repo with Hexo

**Install hexo static generator**  
`npm install -g hexo` # should ask for sudo  

**Run Hexo on your localhost:4000**  
`hexo server`  
    
**Generate final static website that is deployed**  
`hexo generate` # create the static content  
`cd public` # go to the generating folder  
`python -m SimpleHTTPServer 5000`  # serving to localhost:5000  


<br><br>

Author: Samuel Ondrek