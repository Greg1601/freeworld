<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20181024121219 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE comment (id INT AUTO_INCREMENT NOT NULL, user_id_id INT NOT NULL, post_id_id INT DEFAULT NULL, body LONGTEXT NOT NULL, released_date DATETIME NOT NULL, INDEX IDX_9474526C9D86650F (user_id_id), INDEX IDX_9474526CE85F12B8 (post_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE accessibility (id INT AUTO_INCREMENT NOT NULL, equipment VARCHAR(100) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE role (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE app_users (id INT AUTO_INCREMENT NOT NULL, role_id_id INT NOT NULL, city_id_id INT DEFAULT NULL, username VARCHAR(255) NOT NULL, password VARCHAR(500) NOT NULL, email VARCHAR(500) NOT NULL, description LONGTEXT DEFAULT NULL, is_active SMALLINT NOT NULL, image LONGTEXT DEFAULT NULL, INDEX IDX_C250282488987678 (role_id_id), INDEX IDX_C25028243CCE3900 (city_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE country (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE post (id INT AUTO_INCREMENT NOT NULL, place_id INT DEFAULT NULL, user_id INT NOT NULL, title LONGTEXT NOT NULL, body LONGTEXT NOT NULL, image VARCHAR(255) DEFAULT NULL, released_date DATETIME NOT NULL, positive_opinion INT DEFAULT NULL, negative_opinion INT DEFAULT NULL, INDEX IDX_5A8A6C8DDA6A219 (place_id), INDEX IDX_5A8A6C8DA76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE event (id INT AUTO_INCREMENT NOT NULL, place_id_id INT DEFAULT NULL, user_id_id INT DEFAULT NULL, name LONGTEXT NOT NULL, coordonates LONGTEXT NOT NULL, description LONGTEXT NOT NULL, begin DATETIME DEFAULT NULL, end DATETIME DEFAULT NULL, image VARCHAR(255) DEFAULT NULL, INDEX IDX_3BAE0AA7D6328574 (place_id_id), INDEX IDX_3BAE0AA79D86650F (user_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE event_type (event_id INT NOT NULL, type_id INT NOT NULL, INDEX IDX_93151B8271F7E88B (event_id), INDEX IDX_93151B82C54C8C93 (type_id), PRIMARY KEY(event_id, type_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE type (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE place_type (id INT AUTO_INCREMENT NOT NULL, type VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE place (id INT AUTO_INCREMENT NOT NULL, city_id_id INT DEFAULT NULL, user_id_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, address VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, image VARCHAR(255) DEFAULT NULL, positive_opinion INT NOT NULL, negative_opinion INT NOT NULL, longitude_deg DOUBLE PRECISION NOT NULL, latitude_deg DOUBLE PRECISION NOT NULL, type INT DEFAULT NULL, INDEX IDX_741D53CD3CCE3900 (city_id_id), INDEX IDX_741D53CD9D86650F (user_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE place_place_type (place_id INT NOT NULL, place_type_id INT NOT NULL, INDEX IDX_68ABB1CDDA6A219 (place_id), INDEX IDX_68ABB1CDF1809B68 (place_type_id), PRIMARY KEY(place_id, place_type_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE place_accessibility (place_id INT NOT NULL, accessibility_id INT NOT NULL, INDEX IDX_BFF46C50DA6A219 (place_id), INDEX IDX_BFF46C508FEE2CA0 (accessibility_id), PRIMARY KEY(place_id, accessibility_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE city (id INT AUTO_INCREMENT NOT NULL, country_id_id INT NOT NULL, county VARCHAR(255) DEFAULT NULL, slug VARCHAR(255) DEFAULT NULL, simple_name LONGTEXT DEFAULT NULL, real_name LONGTEXT DEFAULT NULL, postal_code VARCHAR(255) DEFAULT NULL, borough SMALLINT NOT NULL, longitude_deg DOUBLE PRECISION DEFAULT NULL, latitude_deg DOUBLE PRECISION DEFAULT NULL, longitude_dms LONGTEXT DEFAULT NULL, latitude_dms LONGTEXT DEFAULT NULL, INDEX IDX_2D5B0234D8A48BBD (country_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526C9D86650F FOREIGN KEY (user_id_id) REFERENCES app_users (id)');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526CE85F12B8 FOREIGN KEY (post_id_id) REFERENCES post (id)');
        $this->addSql('ALTER TABLE app_users ADD CONSTRAINT FK_C250282488987678 FOREIGN KEY (role_id_id) REFERENCES role (id)');
        $this->addSql('ALTER TABLE app_users ADD CONSTRAINT FK_C25028243CCE3900 FOREIGN KEY (city_id_id) REFERENCES city (id)');
        $this->addSql('ALTER TABLE post ADD CONSTRAINT FK_5A8A6C8DDA6A219 FOREIGN KEY (place_id) REFERENCES place (id)');
        $this->addSql('ALTER TABLE post ADD CONSTRAINT FK_5A8A6C8DA76ED395 FOREIGN KEY (user_id) REFERENCES app_users (id)');
        $this->addSql('ALTER TABLE event ADD CONSTRAINT FK_3BAE0AA7D6328574 FOREIGN KEY (place_id_id) REFERENCES place (id)');
        $this->addSql('ALTER TABLE event ADD CONSTRAINT FK_3BAE0AA79D86650F FOREIGN KEY (user_id_id) REFERENCES app_users (id)');
        $this->addSql('ALTER TABLE event_type ADD CONSTRAINT FK_93151B8271F7E88B FOREIGN KEY (event_id) REFERENCES event (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE event_type ADD CONSTRAINT FK_93151B82C54C8C93 FOREIGN KEY (type_id) REFERENCES type (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE place ADD CONSTRAINT FK_741D53CD3CCE3900 FOREIGN KEY (city_id_id) REFERENCES city (id)');
        $this->addSql('ALTER TABLE place ADD CONSTRAINT FK_741D53CD9D86650F FOREIGN KEY (user_id_id) REFERENCES app_users (id)');
        $this->addSql('ALTER TABLE place_place_type ADD CONSTRAINT FK_68ABB1CDDA6A219 FOREIGN KEY (place_id) REFERENCES place (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE place_place_type ADD CONSTRAINT FK_68ABB1CDF1809B68 FOREIGN KEY (place_type_id) REFERENCES place_type (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE place_accessibility ADD CONSTRAINT FK_BFF46C50DA6A219 FOREIGN KEY (place_id) REFERENCES place (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE place_accessibility ADD CONSTRAINT FK_BFF46C508FEE2CA0 FOREIGN KEY (accessibility_id) REFERENCES accessibility (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE city ADD CONSTRAINT FK_2D5B0234D8A48BBD FOREIGN KEY (country_id_id) REFERENCES country (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE place_accessibility DROP FOREIGN KEY FK_BFF46C508FEE2CA0');
        $this->addSql('ALTER TABLE app_users DROP FOREIGN KEY FK_C250282488987678');
        $this->addSql('ALTER TABLE comment DROP FOREIGN KEY FK_9474526C9D86650F');
        $this->addSql('ALTER TABLE post DROP FOREIGN KEY FK_5A8A6C8DA76ED395');
        $this->addSql('ALTER TABLE event DROP FOREIGN KEY FK_3BAE0AA79D86650F');
        $this->addSql('ALTER TABLE place DROP FOREIGN KEY FK_741D53CD9D86650F');
        $this->addSql('ALTER TABLE city DROP FOREIGN KEY FK_2D5B0234D8A48BBD');
        $this->addSql('ALTER TABLE comment DROP FOREIGN KEY FK_9474526CE85F12B8');
        $this->addSql('ALTER TABLE event_type DROP FOREIGN KEY FK_93151B8271F7E88B');
        $this->addSql('ALTER TABLE event_type DROP FOREIGN KEY FK_93151B82C54C8C93');
        $this->addSql('ALTER TABLE place_place_type DROP FOREIGN KEY FK_68ABB1CDF1809B68');
        $this->addSql('ALTER TABLE post DROP FOREIGN KEY FK_5A8A6C8DDA6A219');
        $this->addSql('ALTER TABLE event DROP FOREIGN KEY FK_3BAE0AA7D6328574');
        $this->addSql('ALTER TABLE place_place_type DROP FOREIGN KEY FK_68ABB1CDDA6A219');
        $this->addSql('ALTER TABLE place_accessibility DROP FOREIGN KEY FK_BFF46C50DA6A219');
        $this->addSql('ALTER TABLE app_users DROP FOREIGN KEY FK_C25028243CCE3900');
        $this->addSql('ALTER TABLE place DROP FOREIGN KEY FK_741D53CD3CCE3900');
        $this->addSql('DROP TABLE comment');
        $this->addSql('DROP TABLE accessibility');
        $this->addSql('DROP TABLE role');
        $this->addSql('DROP TABLE app_users');
        $this->addSql('DROP TABLE country');
        $this->addSql('DROP TABLE post');
        $this->addSql('DROP TABLE event');
        $this->addSql('DROP TABLE event_type');
        $this->addSql('DROP TABLE type');
        $this->addSql('DROP TABLE place_type');
        $this->addSql('DROP TABLE place');
        $this->addSql('DROP TABLE place_place_type');
        $this->addSql('DROP TABLE place_accessibility');
        $this->addSql('DROP TABLE city');
    }
}
