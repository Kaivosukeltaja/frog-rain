sudo yum install tomcat wget -y
sudo systemctl enable tomcat

sudo mkdir /opt/magnolia
sudo chown tomcat:tomcat /opt/magnolia

echo 'JAVA_OPTS="-Dmagnolia.update.auto=true -Dmagnolia.home=/opt/magnolia -Dmagnolia.resources.dir=/vagrant/magnolia-modules/ -Djava.security.egd=file:/dev/./urandom -Djava.awt.headless=true -Xmx1024m -XX:MaxPermSize=512m -XX:+UseConcMarkSweepGC"' | sudo tee -a /usr/share/tomcat/conf/tomcat.conf
sudo wget https://nexus.magnolia-cms.com/content/repositories/magnolia.public.releases/info/magnolia/bundle/magnolia-community-webapp/5.5/magnolia-community-webapp-5.5.war \
  -O /usr/share/tomcat/webapps/ROOT.war

sudo systemctl start tomcat
