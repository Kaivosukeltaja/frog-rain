# -*- mode: ruby -*-
# vi: set ft=ruby :

# The commands below will be executed on the virtual machine once it is up.
$magnoliaDownloadUrl = "https://nexus.magnolia-cms.com/service/local/artifact/maven/content?r=magnolia.public.releases&g=info.magnolia.bundle&a=magnolia-community-webapp&e=war&v=LATEST"

$script = <<SCRIPT
sudo yum update
sudo yum install tomcat wget -y
sudo systemctl enable tomcat

sudo mkdir /opt/magnolia
sudo chown tomcat:tomcat /opt/magnolia

echo 'JAVA_OPTS="-Dmagnolia.update.auto=true -Dmagnolia.develop=true -Dmagnolia.home=/opt/magnolia -Dmagnolia.resources.dir=/vagrant/magnolia-modules/ -Djava.security.egd=file:/dev/./urandom -Djava.awt.headless=true -Xmx1024m -XX:MaxPermSize=512m -XX:+UseConcMarkSweepGC"' | sudo tee -a /usr/share/tomcat/conf/tomcat.conf
sudo wget '#{$magnoliaDownloadUrl}' -O /usr/share/tomcat/webapps/ROOT.war

sudo systemctl start tomcat
SCRIPT

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure(2) do |config|

  config.vm.box = "centos/7"
  config.vm.network "forwarded_port", guest: 8080, host: 8888
  config.vm.synced_folder ".", "/vagrant"

  config.vm.provider "virtualbox" do |vb|
    vb.memory = "1024"
  end

  config.vm.provision :shell, inline: $script

end
