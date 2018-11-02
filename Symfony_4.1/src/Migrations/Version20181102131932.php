<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20181102131932 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE app_users CHANGE role_id role_id INT NOT NULL');
        $this->addSql('ALTER TABLE messages ADD is_treated TINYINT(1) NOT NULL');
        $this->addSql('ALTER TABLE city CHANGE country_id country_id INT NOT NULL, CHANGE county county VARCHAR(255) DEFAULT NULL, CHANGE slug slug VARCHAR(255) DEFAULT NULL, CHANGE postal_code postal_code VARCHAR(255) DEFAULT NULL, CHANGE borough borough SMALLINT NOT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE app_users CHANGE role_id role_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE city CHANGE country_id country_id INT DEFAULT NULL, CHANGE county county VARCHAR(3) DEFAULT NULL COLLATE utf8_unicode_ci, CHANGE slug slug LONGTEXT DEFAULT NULL COLLATE utf8_unicode_ci, CHANGE postal_code postal_code LONGTEXT DEFAULT NULL COLLATE utf8_unicode_ci, CHANGE borough borough SMALLINT UNSIGNED DEFAULT NULL');
        $this->addSql('ALTER TABLE messages DROP is_treated');
    }
}
