class Puzzle < ApplicationRecord
    has_many :rows
    has_many :columns

    def add_info
        solution_hash = solution_hasher
        row_params = solution_hash[:row_params]
        column_params = solution_hash[:column_params]
        self.solution = solution_hash[:solution_html_ids]
        row_params.each_with_index do |row, index|
            self.rows.create(parameters: row, completion_status: 0, puzzle_location: index)
        end
        column_params.each_with_index do |column, index|
            self.columns.create(parameters: column, completion_status: 0, puzzle_location: index)
        end
    end

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

    private

    def randomize(array)
        array.each_with_index do |number, i|
            j = rand(0..array.size)
            array[i],array[j]=array[j],array[i]
        end
        array
    end
    
    def solution_div_indices_generator
        all_nums = (0..624).to_a
        all_nums = randomize(all_nums)
        all_nums = all_nums[0..350]
    end
    
    def solution_div_indices_to_html_ids(arry)
      arry.collect do |number|
        number = number.to_i
        "#{number/25 + 1}-#{number%25+1}"
      end
    end
        
    def solution_html_ids_to_coordinates(solutions)
        solutions.collect do |coordinates|
            coordinates.split("-")
        end
    end
    
    def collectRow(i, solution_coordinates)
        solution_coordinates.select do |coordinates|
            coordinates[1]==i.to_s
        end
    end
    
    
    def createRowParams(particular_row_params)
        sorted = particular_row_params.sort_by{|coord| coord[0].to_i}
            parameters = []
            p=1
            for i in 0...sorted.length-1
                if sorted[i][0].to_i+1 == sorted[i+1][0].to_i
                p+=1
                else
                parameters << p
                p = 1
                end
            end
            parameters << p
        parameters
    end
    
    def createAllRowParams(solution_coordinates)
        allParams = []
            for i in 1..25
                allParams << createRowParams(collectRow(i, solution_coordinates))
            end
        allParams
    end
    
    def collectColumn(i, solution_coordinates)
        solution_coordinates.select do |coordinates|
            coordinates[0]==i.to_s
        end
    end
      
      
    def createColumnParams(particular_column_params)
        sorted = particular_column_params.sort_by{|coord| coord[1].to_i}
        parameters = []
        p=1
        for i in 0...sorted.length-1
            if sorted[i][1].to_i+1 == sorted[i+1][1].to_i
                p+=1
            else
                parameters << p
                p = 1
            end
        end
        parameters << p
        parameters
    end
    
    def createAllColumnParams(solution_coordinates)
        allParams = []
        for i in 1..25
            allParams << createColumnParams(collectColumn(i, solution_coordinates))
        end
        allParams
    end
    
      # solutions = solution_html_ids_to_coordinates(solution_div_indices_to_html_ids(solution_div_indices_generator))
    
    def solution_coordinates_sanitizer(solution_coordinates)
        good_solution_coordinates = []
        solution_coordinates.each_with_index do |solution_coordinate_to_check, check_index|
            possibilities = []
            possibilities.push(["#{(solution_coordinate_to_check[0].to_i)+1}", "#{solution_coordinate_to_check[1]}"])
            possibilities.push(["#{(solution_coordinate_to_check[0].to_i)-1}", "#{solution_coordinate_to_check[1]}"])
            possibilities.push(["#{solution_coordinate_to_check[0]}", "#{(solution_coordinate_to_check[1].to_i)+1}"])
            possibilities.push(["#{solution_coordinate_to_check[0]}", "#{(solution_coordinate_to_check[1].to_i)-1}"])
            good_solution = false
            possibilities.each do |possible_close_solution|
                if solution_coordinates.include?(possible_close_solution)
                    good_solution = true
                end
            end
            if good_solution
                good_solution_coordinates << solution_coordinate_to_check
            end
        end
        good_solution_coordinates
    end
    
    def solution_hasher
        solution_html_ids = solution_div_indices_to_html_ids(solution_div_indices_generator)
        solution_coordinates = solution_html_ids_to_coordinates(solution_html_ids)
        solution_coordinates_sanitized = solution_coordinates_sanitizer(solution_coordinates)
        sanitized_solution_html_ids = solution_coordinates_sanitized.collect do |coordinate_array| 
            coordinate_array.join("-")
        end
        solutions_hash = {
            "solution_html_ids": sanitized_solution_html_ids,
            "row_params": createAllRowParams(solution_coordinates_sanitized),
            "column_params": createAllColumnParams(solution_coordinates_sanitized)
        }
    end
      
    
      #test
    # 2.times
    #     solution_hash = solution_hasher
    #     row_params = solution_hash[:row_params]
    #     column_params = solution_hash[:column_params]
    #     p = Puzzle.create
    #     p.solution = solution_hash[:solution_html_ids]
    #     row_params.each_with_index do |row, index|
    #         p.rows.create(parameters: row, completion_status: 0, puzzle_location: index)
    #     end
    #     column_params.each_with_index do |column, index|
    #         p.columns.create(parameters: column, completion_status: 0, puzzle_location: index)
    #     end
    #     p.save
end
