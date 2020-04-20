class PuzzleController < ApplicationController
    def puzzleInfo
        doc = Nokogiri::HTML(open('https://www.puzzle-nonograms.com/', :ssl_verify_mode => OpenSSL::SSL::VERIFY_NONE))

        puzzleInfo = doc.css('.puzzleInfo')
        render json: { puzzleId: "#{puzzleInfo}" } 
    end
end
