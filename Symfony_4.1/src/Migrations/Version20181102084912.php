<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20181102084912 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE messages (id INT AUTO_INCREMENT NOT NULL, title LONGTEXT NOT NULL, message LONGTEXT NOT NULL, firstname LONGTEXT NOT NULL, lastname LONGTEXT NOT NULL, email LONGTEXT NOT NULL, phone LONGTEXT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE city CHANGE country_id country_id INT NOT NULL, CHANGE county county VARCHAR(255) DEFAULT NULL, CHANGE slug slug VARCHAR(255) DEFAULT NULL, CHANGE postal_code postal_code VARCHAR(255) DEFAULT NULL, CHANGE borough borough SMALLINT NOT NULL');
        $this->addSql('ALTER TABLE app_users CHANGE role_id role_id INT NOT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE messages');
        $this->addSql('ALTER TABLE app_users CHANGE role_id role_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE city CHANGE country_id country_id INT DEFAULT NULL, CHANGE county county VARCHAR(3) DEFAULT NULL COLLATE utf8_unicode_ci, CHANGE slug slug LONGTEXT DEFAULT NULL COLLATE utf8_unicode_ci, CHANGE postal_code postal_code LONGTEXT DEFAULT NULL COLLATE utf8_unicode_ci, CHANGE borough borough SMALLINT UNSIGNED DEFAULT NULL');
    }
}
