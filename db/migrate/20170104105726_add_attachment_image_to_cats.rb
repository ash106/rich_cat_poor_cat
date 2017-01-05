class AddAttachmentImageToCats < ActiveRecord::Migration
  def self.up
    change_table :cats do |t|
      t.attachment :image
    end
  end

  def self.down
    remove_attachment :cats, :image
  end
end
