class CreateCats < ActiveRecord::Migration[5.0]
  def change
    create_table :cats do |t|
      t.integer :finances

      t.timestamps
    end
  end
end
