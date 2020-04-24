class Puzzle < ApplicationRecord
    has_many :rows
    has_many :columns

    def find_max_array_size(array_of_arrays)
        max_length = 0
        array_of_arrays.each do |array|
            max_length = array.size if array.size > max_length
        end
        max_length
    end

    def column_parameters
        self.columns.collect do |column|
            column.parameters
        end
    end

    def column_max
        find_max_array_size(self.column_parameters)
    end

    def row_parameters
        self.rows.collect do |row|
            row.parameters
        end
    end

    def row_max
        find_max_array_size(self.row_parameters)
    end
end
